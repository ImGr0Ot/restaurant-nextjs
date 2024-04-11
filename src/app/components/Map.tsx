"use client"
import React, { useEffect } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { useRouter } from "next/navigation"
const Map = () => {
	const router = useRouter()
	const mapRef = React.useRef<HTMLDivElement>(null)
	useEffect(() => {
		const initMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_MAP_API_KEY as string,
				version: "weekly",
			})
			const { Map } = await loader.importLibrary("maps")
			const { Marker } = await loader.importLibrary("marker")
			const position = {
				lat: 22.1424,
				lng: -80.4572,
			}
			const mapOptions = {
				center: position,
				zoom: 10,
				mapId: "MyMapId",
			}
			const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

			const marker = new Marker({
				map: map,
				position: position,
			})
		}
		initMap()
	}, [])
	return (<>{
		<div
			ref={mapRef}
			className='h-[400px] rounded-md mx-10 lg:mx-5'
		/> || router.push("/")}
	</>)
}

export default Map
