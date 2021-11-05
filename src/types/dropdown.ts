
export type DropDownItem = DropDownPriceItem | DropDownAddressItem;


interface BaseDropDown {
    name: string,
}

interface DropDownPriceItem extends BaseDropDown {
    type: string,
    amount: string,
    address?: string,
}

interface DropDownAddressItem extends BaseDropDown {
    address: string,
    type?: string,
    amount?: string,
}