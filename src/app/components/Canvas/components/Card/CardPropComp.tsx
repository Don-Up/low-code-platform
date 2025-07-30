import React from "react";
import {CardPropCompProp} from "@/app/components/Canvas/components/Card/CardPropCompProp";

type OnCardChange = {
    onChange: (values: CardPropCompProp) => void
}

const CardPropComp: React.FC<CardPropCompProp & OnCardChange> = ({}) => {

   return <div>CardPropComp</div>
}

export default CardPropComp