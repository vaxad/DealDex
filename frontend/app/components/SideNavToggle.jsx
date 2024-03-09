"use client"
import { Button } from '../../components/ui/button'
import store from '../../lib/zustand'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export default function SideNavToggle() {
    const {toggleSidenav} = store() 
  return (
    <Button variant="outline" size="icon" onClick={()=>{toggleSidenav()}}>
      <HamburgerMenuIcon/>
    </Button>
  )
}
