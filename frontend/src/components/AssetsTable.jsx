import { Table } from 'antd'
import { useCrypto } from '../context/crypto-context.jsx'

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		sorter: (a, b) => a.name.length - b.name.length
	},
	{
		title: 'Price, $',
		dataIndex: 'price',
		sorter: (a, b) => a.price - b.price
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		sorter: (a, b) => a.amount - b.amount
	}
]

export default function AssetsTable() {
	const {assets} = useCrypto()
	
	const data = assets.map(a => ({
		key: a.id,
		name: a.name,
		price: a.price,
		amount: a.amount,
	}))
	
	return (
		<>
			<Table pagination={false} columns={columns} dataSource={data}/>
		</>
	)
}