import { useRef, useEffect } from 'react';
import useVisibility from '@/app/_utils/tools/useVisibility';
import cachingLoader from '@/app/_utils/tools/cachingLoader';

export default function LoadFooter({
	elementMap,
	page,
	limit,
	cache,
	setRenderer,
}: {
    elementMap: any,
	page: any,
	limit: any,
	cache: any,
	setCache: any,
	setElementMap: any,
	setRenderer: any,
}) {
	const triggerRef = useRef(null);
	const isVisible = useVisibility(triggerRef, '0px');

	useEffect(() => {
		if (isVisible) {
			const getNewMap = async () => {
				const loaderData = await cachingLoader(elementMap, '/api/requests', {
					page,
					limit,
                    cache,
					action: 'load',
                    
				});
				
				setRenderer('client');
			};

			getNewMap();
		}
	});

	return <div ref={triggerRef}>Loader</div>;
}
