"use client"
import { MdImageSearch } from "react-icons/md"
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage"

import { app } from "../../utils/firebase"
import { useRouter, useSearchParams } from "next/navigation"

export const ImageLabel = () => {
	const router = useRouter()
	const params = useSearchParams()
	const storage = getStorage(app)

	const submitImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const img = e.target.files ? e.target.files[0] : null

			if (img) {
				const name = img.name
				const storageRef = ref(storage, name)

				const uploadTask = uploadBytesResumable(storageRef, img)

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						console.log("Upload is " + progress + "% done")
						switch (snapshot.state) {
							case "paused":
								console.log("Upload is paused")
								break
							case "running":
								console.log("Upload is running")
								break
						}
					},
					(error) => {
						console.log(error)
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(
							async (downloadURL) => {
								console.log(downloadURL)
								const url = new URLSearchParams({
									imgUrl: downloadURL,
								})
								router.push(`?${params}&${url.toString() as any}`)
							}
						)
					}
				)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<input
				type='file'
				onChange={submitImage}
				id='image'
				name='picture'
				className='hidden'
			/>
			<div className='flex'>
				<label
					htmlFor='image'
					className='mx-28 cursor-pointer'>
					<MdImageSearch size={36} />
				</label>
			</div>
		</>
	)
}

export default ImageLabel
