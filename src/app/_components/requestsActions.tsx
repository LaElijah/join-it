import RequestList from './requestsList';
import RequestOptions from './elements/requestsOptions';
import dbConnection from '../_utils/db/dbConnection';
import Request from '../_utils/models/request';
// TODO: Update types
export default async function RequestsActions() {
	await dbConnection();
	const requests = JSON.stringify(await Request.find({}).limit(20));
	return (
		<div>
			<RequestOptions requestData={requests}>
				<RequestList requestData={requests} />
			</RequestOptions>
		</div>
	);
}
