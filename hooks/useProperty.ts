import { populatedProductT } from "@/types";
import { useState } from "react";

export default function useProperty() {
      const [properties, setProperties] = useState<populatedProductT[]>([]);
  

    function updateProperty(property:populatedProductT | populatedProductT[], remove?:boolean, toEnd?:boolean) {
        setProperties(prev=>{

          if (Array.isArray(property)) {
              return [...prev, ...property]
          }
          
          if (remove) {
            return  prev.filter(item=>item.id !== property.id)
          }
          const index = prev.findIndex(item=>item.id === property.id)
          if (index >= 0) {
              prev[index]=property
            return [...prev]
          }
          else {
            return  toEnd ? [ ...prev, property] : [property, ...prev]
          }
        })
       
    }
    return {properties, updateProperty}
}