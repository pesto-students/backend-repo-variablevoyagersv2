export const filterDeleted = (req, res, next) => {
  const originalSend = res.send.bind(res);

  res.send = function (body) {
    try {
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      const filterDeleted = (data) => {
        if (Array.isArray(data)) {
          return data
            .filter((item) => !item.isDeleted)
            .map((item) => {
              delete item.isDeleted;
              return item;
            });
        } else if (typeof data === 'object' && data !== null) {
          if (Object.prototype.hasOwnProperty.call(data, 'isDeleted')) {
            delete data.isDeleted;
          }
        }
        return data;
      };

      if (body && typeof body === 'object' && body.data) {
        body.data = filterDeleted(body.data);
      } else {
        body = filterDeleted(body);
      }

      return originalSend.call(this, JSON.stringify(body));
    } catch (error) {
      return originalSend.call(this, body);
    }
  };

  next();
};
