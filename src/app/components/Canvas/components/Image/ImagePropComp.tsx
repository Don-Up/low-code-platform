import React from "react";
import {ImagePropCompProp} from "@/app/components/Canvas/components/Image/ImagePropCompProp";

type OnImageChange = {
    onChange: (values: ImagePropCompProp) => void
}

const ImagePropComp: React.FC<ImagePropCompProp & OnImageChange> = ({}) => {

    return <div>ImagePropComp</div>
}

export default ImagePropComp