import { OrderType } from "@/utils/types"
import React from "react"
import { getOrders } from "./orderActions"
import { FcOk } from "react-icons/fc"
import { MdOutlinePending } from "react-icons/md"
import { FcCancel } from "react-icons/fc"
import { FaRegEdit } from "react-icons/fa"
const DashboardWorkerPage = async () => {
	const orders: OrderType[] = await getOrders()
	return (
		<>
			{" "}
			<div className='bg-gradient-to-b from-indigo-500 h-[300px] w-full fixed top-0 -z-10'></div>
			<div className='bg-gradient-to-t from-indigo-500 h-[300px] w-full fixed bottom-0 -z-10'></div>
			<h1 className='text-center text-3xl font-semibold mt-10 text-slate-600'>
				{" "}
				Orders
			</h1>
			<div className='flex flex-col mx-24 mt-5'>
				<div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
						<div className='overflow-hidden'>
							<table className='min-w-full text-left text-sm font-light'>
								<thead className='border-b font-medium border-slate-400'>
									<tr>
										<th
											scope='col'
											className='px-3 py-4'>
											Id
										</th>
										<th
											scope='col'
											className='px-1 py-4'>
											Date
										</th>
										<th
											scope='col'
											className='px-10 py-4'>
											Products
										</th>
										<th
											scope='col'
											className='px-4 py-4'>
											Status
										</th>
										<th
											scope='col'
											className='px-1 py-4'>
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									{orders.map((order) => (
										<tr
											key={order._id as string}
											className='border-b border-slate-400'>
											<td className='whitespace-nowrap px-3 py-4 font-medium'>
												{order._id}
											</td>
											<td className='whitespace-nowrap px-1 py-4'>
												{new Date(order.createdAt).toLocaleDateString()}
												&nbsp;
												{new Date(order.createdAt).toLocaleTimeString()}
											</td>
											<td className='whitespace-nowrap px-10 py-4 overflow-x-auto'>
												{order.products}
											</td>
											<td className='whitespace-nowrap px-4 py-4 overflow-x-auto'>
												<div className='flex gap-1'>
													{order.status}
													{order.status === "Pending" && (
														<MdOutlinePending
															size={20}
															className=''
														/>
													)}
													{order.status === "Canceled" && (
														<FcCancel
															size={20}
															className=''
														/>
													)}
													{order.status === "Done" && (
														<FcOk
															size={20}
															className=''
														/>
													)}
												</div>
											</td>
											<td className='whitespace-nowrap px-1 py-4'>
												${order.total}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default DashboardWorkerPage
