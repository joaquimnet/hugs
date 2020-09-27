const path = require('path');
const fs = require('fs/promises');
const recursiveWithCallback = require('recursive-readdir');
const { promisify } = require('util');
const { Router } = require('express');

const recursive = promisify(recursiveWithCallback);

async function loadServices(serviceDir, app) {
  const files = await recursive(serviceDir, ['!*.service.js']);
  const services = files.map(require);

  for (const service of services) {
    if (!service.routes) continue;
    const routes = [];

    for (const route of Object.keys(service.routes)) {
      let [method, endpoint] = route.split(/ +/);
      method = method.toLowerCase();

      const actionName = service.routes[route];
      let action;
      let middleware = [];

      if (typeof service.actions[actionName] === 'function') {
        action = service.actions[actionName];
      } else if (
        typeof service.actions[actionName] === 'object' &&
        service.actions[actionName].handler
      ) {
        action = service.actions[actionName].handler;
      }

      if (
        service.actions[actionName]?.middleware &&
        Array.isArray(service.actions[actionName]?.middleware)
      ) {
        middleware = middleware.concat(service.actions[actionName]?.middleware);
      }

      if (!action) {
        throw new Error(`Action ${actionName} not found in service ${service.name}`);
      }
      // console.log('method, endpoint, middleware, action: \n', method, endpoint, middleware, action);
      const args = [];
      args.push(endpoint);
      if (middleware.length) {
        args.push(...middleware);
      }
      args.push(action);
      routes.push({ method, args });
    }

    if (routes.length) {
      const router = Router();
      for (const route of routes) {
        router[route.method](...route.args);
      }
      app.use(router);
    }
  }
}

module.exports = {
  loadServices,
};
