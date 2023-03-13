import { ref } from '@firebase/storage';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { auth, storage } from '../../libs/firebaseConfig';
import Clipboard from '../Icons/Clipboard';
import Loader from '../Layout/Loader';

type Props = {};
export default function ImageUploader({}: Props) {
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [downloadURL, setDownloadURL] = useState('');
	// const [file, setFile] = useState<File | null>(null);

	const { currentUser } = auth;

	const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (!e.target.files) {
			toast.error('Select a Image !!');
			return;
		}
		const file = e.target.files[0];
		const extention = e.target.files[0].type.split('/')[1];

		if (!file || !currentUser) {
			return;
		}
		setUploading(true);
		const storageRef = ref(
			storage,
			`uploads/${currentUser?.uid}/${file?.name}-${Date.now()}.${extention}`
		);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			snapshot => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);

				setProgress(progress);
			},
			error => {
				console.log(error);
				setUploading(false);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(url => {
					setDownloadURL(url);
					setUploading(false);
				});
			}
		);
	};

	const peogressStatus = (
		<p className='font-semibold'>Upload progress: {progress}%</p>
	);
	const peogressCompelete = (
		<p className='font-semibold text-success'>
			Image Uploaded Successfully. Click on Icon to Copy the Link to Clipboard.
		</p>
	);

	return (
		<div className='my-2 flex items-center justify-between'>
			<Loader show={uploading} />
			{!uploading && (
				<label className='btn btn-sm sm:btn-md btn-outline w-48 max-w-xs rounded-sm'>
					<input
						type='file'
						onChange={uploadFile}
						accept='image/x-png,image/gif,image/jpeg'
						className='hidden'
					/>
					<span>📷 Upload Image</span>
				</label>
			)}
			{progress !== 0 && peogressStatus}
			{downloadURL.length > 0 && (
				<div
					className='btn btn-outline btn-circle'
					onClick={() => {
						navigator.clipboard.writeText(`![alt](${downloadURL})`);
					}}>
					<Clipboard className='h-6 w-6' />
				</div>
			)}
		</div>
	);
}
