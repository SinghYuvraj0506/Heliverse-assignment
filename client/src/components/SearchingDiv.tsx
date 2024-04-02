import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
import { AvailableDomains, AvailableGenders } from "@/lib/constants";

const SearchingDiv = ({handleFilterChange}) => {
    return (
      <div className="w-full flex lg:items-center p-1 lg:flex-row flex-col items-start lg:gap-10 sm:gap-5 gap-3">
        <div className="flex lg:w-1/2 w-full">
          <Input type="text" placeholder="Search User" onChange={(e)=>handleFilterChange("search",e.target.value)}/>
        </div>
  
        <div className="w-full gap-2 sm:gap-5 items-center flex flex-wrap lg:justify-end justify-start">
          {/* Gender ------------------ */}
          <Select onValueChange={(e)=>handleFilterChange("gender",e)}>
            <SelectTrigger className="w-[120px] sm:w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              {AvailableGenders?.map((e,i)=>{
                return  <SelectItem value={e} key={`gender${i}`}>{e}</SelectItem>
              })}
            </SelectContent>
          </Select>
  
          {/* Availabilty ------------------ */}
          <Select onValueChange={(e)=>handleFilterChange("availability",e)}>
            <SelectTrigger className="w-[120px] sm:w-[180px]">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Not Available</SelectItem>
            </SelectContent>
          </Select>
  
          {/* Domain ------------------ */}
          <Select onValueChange={(e)=>handleFilterChange("domain",e)}>
            <SelectTrigger className="w-[120px] sm:w-[180px]">
              <SelectValue placeholder="Domain" />
            </SelectTrigger>
            <SelectContent>
            {AvailableDomains?.map((e,i)=>{
                return  <SelectItem value={e} key={`domain${i}`}>{e}</SelectItem>
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  export default SearchingDiv;