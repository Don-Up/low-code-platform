import React from "react";
import {InputPropCompProp} from "@/app/components/Canvas/components/Input/InputPropCompProp";

type OnInputChange = {
    onChange: (values: InputPropCompProp) => void
}

const InputPropComp: React.FC<InputPropCompProp & OnInputChange> = ({}) => {

    return <div>
        InputPropComp
    </div>
}

export default InputPropComp