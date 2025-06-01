import { populatedProductT } from "@/types";
import { useState } from "react";

export default function useProperty() {
      const [properties, setProperties] = useState<populatedProductT[]>([]);
  

    function updateProperty(property:populatedProductT | populatedProductT[], remove?:boolean) {
        
        if (Array.isArray(property)) {
            setProperties(prev=>[...prev, ...property])
            return 
        }
        
        if (remove) {
          return  setProperties(properties.filter(item=>item.id !== property.id))
        }
        const index = properties.findIndex(item=>item.id === property.id)
        if (index >= 0) {
            properties[index]=property
          return  setProperties([...properties])
        }
        else {
          return  setProperties([property, ...properties])
        }
       
    }
    return {properties, updateProperty}
}