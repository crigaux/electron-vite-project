import { useFormik } from 'formik'
import { useCallback, useEffect, useMemo } from 'react'
import { UserSerializerRead } from '../../../api/index.ts'
import { useAppSelector } from '../../../store/store.ts'
import { useLazyGetUserByIdQuery } from '../../../features/user/userApi.ts'
import { selectedAgentId } from '../../../features/user/userSlice.ts'

export default function useAgentFormik() {
  // get id from URI path
  const agentId = useAppSelector(selectedAgentId) as number

  const [triggerAgent, agentQuery] = useLazyGetUserByIdQuery({})

  useEffect(() => {
    if (agentId === -1) return
    if (agentId) {
      triggerAgent(Number(agentId))
    }
  }, [agentId])

  const initialValues = useMemo(() => {
    if (agentId === -1) return {}

    if (agentQuery.data) {
      return agentQuery.data
    }
  }, [agentQuery.data, agentId]) as UserSerializerRead

  const agentFormik = useFormik({
    initialValues,
    validateOnBlur: true,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: useCallback(async () => null, []),
  })

  return { agentFormik }
}
