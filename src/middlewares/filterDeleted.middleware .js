export const filterDeleted = (req, res, next) => {
	const originalSend = res.send;

	res.send = function (body) {
		if (typeof body === 'string') {
			body = JSON.parse(body);
		}

		const filterDeleted = (data) => {
			if (Array.isArray(data)) {
				return data.filter((item) => !item.isDeleted);
			} else if (typeof data === 'object' && data !== null) {
				for (const key in data) {
					if (data[key] && data[key].isDeleted) {
						delete data[key];
					}
				}
			}
			return data;
		};

		if (body.data) {
			body.data = filterDeleted(body.data);
		}

		return originalSend.call(this, JSON.stringify(body));
	};

	next();
};
