'use client'

import { CustomSelect } from '@wapijs/ui'
import { useRouter } from 'next/navigation'

const VersionSelector = () => {
	const router = useRouter()

	return (
		<div className="px-4">
			<CustomSelect
				label="Select a version"
				onChangeHandler={e => {
					router.push(`/docs/${e.target.value}`)
				}}
				options={[
					{
						label: 'master',
						value: 'master'
					}
				]}
				defaultValue="main"
			/>
		</div>
	)
}

export default VersionSelector
