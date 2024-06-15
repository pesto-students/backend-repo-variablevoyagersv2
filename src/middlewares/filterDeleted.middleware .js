export const filterDeleted = (req, res, next) => {
  const originalSend = res.send.bind(res);

  res.send = function (body) {
    try {
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      const filterDeleted = (data) => {
        if (Array.isArray(data)) {
          // If data is an array, filter out items with isDeleted === true
          return data
            .filter((item) => !item.isDeleted)
            .map((item) => {
              delete item.isDeleted;
              return item;
            });
        } else if (typeof data === 'object' && data !== null) {
          // If data is a single object, delete the isDeleted property
          if (Object.prototype.hasOwnProperty.call(data, 'isDeleted')) {
            delete data.isDeleted;
          }
        }
        return data;
      };

      // Check if body.data exists and process it
      if (body && typeof body === 'object' && body.data) {
        body.data = filterDeleted(body.data);
      } else {
        // If body is not an object with data property, process the body itself
        body = filterDeleted(body);
      }

      // Send the modified body as a JSON string

      return originalSend.call(this, JSON.stringify(body));
    } catch (error) {
      // If there is an error, send the original body
      return originalSend.call(this, body);
      // return originalSend(body);
    }
  };

  next();
};
