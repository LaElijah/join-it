'use client';
import { useReducer } from 'react';
import { Stack } from '@mui/material';
import { Autocomplete, SegmentedControl } from '@mantine/core';
import { categoryData } from '@/app/_utils/data/categoryData';
import styles from '@/app/_styles/components/list.module.scss';
import LoadFooter from './loadFooter';
import Request from './request';


export default function RequestsOptions({
	children,
	requestData,
}: {
	children: any;
	requestData: string;
}) {
	const requests = JSON.parse(requestData);

	const reducer = (state: any, dispatch: { type: string; payload: any }) => {
		return {
			...state,
			[dispatch.payload.name]: dispatch.payload.value,
		};
	};

	const [state, dispatch] = useReducer(reducer, {
		category: '',
		segment: '',
		page: 1,
		limit: 20,
		childRenderer: 'server',
	});

	let elementMap = new Map()
	let cache = new Map()

	const { category, segment, page, limit, childRenderer } = state;

	requests.forEach((element: JSX.Element, index: number) => {
		elementMap.set(index, { type: 'server', value: element });
	});

	return (
		<>
			<Stack
				direction={'row'}
				className={styles.filters}
			>
				<SegmentedControl
					value={segment}
					onChange={(value: any) => dispatch({ type: 'set', payload: { name: 'segment', value: value }})}
					data={[
						{ label: 'Furthest from goal', value: 'Furthest' },
						{ label: 'Closest', value: 'Closest' },
					]}
				/>
				<Autocomplete // You can add grouping to this using the group property
					label='Category'
					placeholder='Search for any category'
					value={category}
					onChange={(value: any) => dispatch({ type: 'set', payload: { name: 'category', value: value } })}
					data={categoryData}
				/>
			</Stack>

			{childRenderer === 'server' && children}
			{childRenderer === 'client' &&
				elementMap.forEach(({ type, value }: any) => {
					if (type === 'server') {
						return;
					} else {
						return (
							<Request
								{...value}
								key={value._id}
								url={`/requests/${value._id}`}
								date={new Date(value.date).toLocaleDateString()}
							/>
						);
					}
				})}

			<LoadFooter 

			{...state}
			elementMap={elementMap}
			cache={cache}
			setRenderer={(value: any) => dispatch({type: 'set', payload: { name: 'renderer', value } })}
			 />
		</>
	);
}
