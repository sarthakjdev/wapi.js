import { z } from 'zod'

export const ContactMessageBuilderContactSchemaType = z.object({})

export const ContactAddressSchemaType = z.object({
	street: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	country: z.string().optional(),
	country_code: z.string().optional(),
	type: z.enum(['HOME', 'WORK'])
})

export const ContactEmailPayloadSchemaType = z.object({
	email: z.string().optional(),
	type: z.enum(['HOME', 'WORK'])
})

export const ContactPhonePayloadSchemaType = z.object({
	phone: z.string().optional(),
	type: z.enum(['CELL', 'MAIN', 'IPHONE', 'HOME', 'WORK']).optional(),
	wa_id: z.string().optional()
})

export const ContactUrlPayloadSchemaType = z.object({
	url: z.string(),
	type: z.enum(['HOME', 'WORK'])
})

export const ContactOrgPayloadSchemaType = z.object({
	company: z.string().optional(),
	title: z.string().optional(),
	department: z.string().optional()
})

export const ContactNamePayloadSchemaType = z.object({
	formatted_name: z.string(),
	first_name: z.string().optional(),
	last_name: z.string().optional(),
	middle_name: z.string().optional(),
	suffix: z.string().optional(),
	prefix: z.string().optional()
})
