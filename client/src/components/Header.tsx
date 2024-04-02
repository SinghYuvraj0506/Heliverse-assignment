import { useDispatch, useSelector } from "react-redux"
import { Button } from "./ui/button"
import { setDialogFormData } from "@/store/features/generalSlice"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
  const data = useSelector(state => state)
  const dispatch = useDispatch()


  const handleCreateUser = () =>{
    dispatch(setDialogFormData({openDialogForm:true,DialogFormType:"user"}))
  }

  const handleCreateTeam = () =>{
    dispatch(setDialogFormData({openDialogForm:true,DialogFormType:"team"}))
  }

  return (
    <div className='w-full p-2 mt-5 flex sm:items-center items-start justify-between'>
      <div className="flex flex-col gap-1">
        <h1 className="text-lg sm:text-2xl font-bold">{data?.general?.headerTitle} Dashboard</h1>
        {data?.general?.headerSubtitle && <span className="sm:text-lg text-sm text-gray-300">{data?.general?.headerSubtitle}</span>}
      </div>

        {window.screen.width > 600 ? <div className="flex sm:flex-row flex-col justify-end items-center gap-2">
        <Button onClick={handleCreateUser}>Create User</Button>
        <Button onClick={handleCreateTeam}>Create New Team</Button>
        </div>

        :

        <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"> <RxHamburgerMenu /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleCreateUser}>
            Create User
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCreateTeam}>
            Create New Team
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
        
      }
    </div>
  )
}

export default Header