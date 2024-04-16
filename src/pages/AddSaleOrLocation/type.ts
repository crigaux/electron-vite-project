import { PropertySerializerRead, UserSerializerRead } from '../../api'

export type AddSaleOrLocationFormikType = {
  property_id: number
  tenant_id: number
  new_tenant: boolean
  is_new_owner: boolean
  selected_property: PropertySerializerRead
  is_sale: boolean
  new_owner: UserSerializerRead
  new_owner_id: number
  owner: UserSerializerRead
  tenant: UserSerializerRead
}
