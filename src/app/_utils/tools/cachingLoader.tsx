type CacheMap = Map<number, string>;
type ElementMap = Map<
	number,
	{
		type: string;
		value: Object;
	}
>;

type Options = {
	action: 'load' | 'retrieve' | 'reset';
	limit: number;
	page: number;
	middleware?: Function;
	callback?: Function;
	cache?: CacheMap;
};

type statusCode = 100 | 200 | 300 | 400 | 500;
type status = 'success' | 'failure' | 'partial';

interface APIResponse {
	status: status;
	statusCode: statusCode;
	payload: any;
}

export default async function cachingLoader(
	map: ElementMap,
	url: string,
	{ action, middleware, callback, cache, page = 2, limit = 10 }: Options
): Promise<
	| {
			newMap: ElementMap | undefined;
			cache?: CacheMap | undefined;
	  }
	| undefined
> {
	try {
		let oldMap: ElementMap = map;
		if (middleware) oldMap = middleware(map);

		const workingMap = new Map();
		const oldMapLength = oldMap.size;

		switch (action) {
			case 'load': {
				const {
					status,
					payload: { newElements },
				}: APIResponse = await (
					await fetch(
						`${url}${page ? `?page=${page}` : ``}${
							limit ? `&limit=${limit}` : ``
						}`
					)
				).json();
				if (status === 'success') {
					newElements.forEach((element: any) => {
						oldMap.set(oldMapLength + 1, element);

						if (oldMapLength >= limit && cache)
							cache.set(cache.size + 1, JSON.stringify(element));
					});
				} else {
					throw new Error('An error occured while fetching data');
				}
			}

			case 'retrieve': {
				// TODO: Update, this used to have 'limit < oldMapLength'
				if (cache) {
					for (let i = 0; i <= oldMapLength - limit - 1; i++) {
						// from cache
						workingMap.set(i, JSON.parse(cache.get(i) as string));
					}

					for (let i = oldMapLength - limit; i <= oldMapLength; i++) {
						// after cache, use old elements from oldMap
						workingMap.set(i, oldMap.get(i));
					}
				} else {
					throw new Error(
						'Cache is not available, make sure its in your options object'
					);
				}
			}

			case 'reset': {
				if (cache && oldMapLength > 0) {
					for (let i = 0; i <= oldMapLength; i++) {
						workingMap.set(i, JSON.parse(cache.get(i) as string));
					}
				}
			}
		}

		let newMap;

		if (callback) {
			newMap = callback(workingMap);
		} else {
			newMap = workingMap;
		}

		let data: { newMap: ElementMap; cache?: CacheMap } = { newMap };
		if (cache) data.cache = cache;
		return data;
	} catch (error) {
		console.log('Caching loader failed: ', error);
	}
}
