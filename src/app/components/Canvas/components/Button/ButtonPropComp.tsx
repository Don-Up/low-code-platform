import React from "react";
import {ButtonPropCompProp} from "@/app/components/Canvas/components/Button/ButtonPropCompProp";

type OnButtonChange = {
    onChange: (values: ButtonPropCompProp) => void
}

const ButtonPropComp: React.FC<ButtonPropCompProp & OnButtonChange> = ({}) => {

   return <div>ButtonPropComp</div>
}

export default ButtonPropComp