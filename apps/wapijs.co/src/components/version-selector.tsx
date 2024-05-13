'use client'

import { CustomSelect } from '@wapijs/ui'
import { useRouter } from 'next/navigation'
import { type fetchVersions } from '~/reusable-function'

const VersionSelector: React.FC<{
	versions: ReturnType<typeof fetchVersions>
}> = ({ versions }) => {
	const router = useRouter()

	return (
		<div className="px-4">
			<CustomSelect
				label="Select a version"
				onChangeHandler={e => {
					router.push(`/docs/${e.target.value}`)
				}}
				options={versions.map(v => ({
					label: v.version,
					value: v.version
				}))}
				defaultValue="master"
			/>
		</div>
	)
}

export default VersionSelector
