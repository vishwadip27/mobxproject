import userStore from '@/app/store/userStore'
import { observe } from 'mobx'
import { observer } from 'mobx-react-lite'
import { Button } from 'primereact/button'
import React from 'react'

const UserProfie = observer(() => {
  return (
    <div>
      <h2> { userStore.user.name } </h2>
      <p> { userStore.user.email } </p>
      <Button label='update'  onClick={() => userStore.updateUSer("vd" , 30 , "vd@gmail.com" )}/>
      <Button label='FetchUser'  onClick={() => userStore.fetchUserData()} />
        { userStore.loading && <p> Loading... </p> }
    </div>
  )
})

export default UserProfie
