export type CafeType = {
    "_id": string,
    title: string,
}


export type CategoryType = {
    "_id": string,
    title: string,
    title_ky: string
}



export type FoodsType = {
    _id: string
    cafeId: string
    catId: string
    catTitle: string
    createdAt: string
    desc: string
    desc_ky: string
    img: string
    price: string
    recipe: string[]
    recipe_ky: string[]
    size: string
    title: string
    title_ky: string
    updatedAt: string
}


export type SubcatType = {
    _id: string
    cafeId: string
    catId: string
    createdAt: string
    disabled: boolean
    isDelete: boolean
    title: string
    title_ky: string
    updatedAt: string
    value?: FoodsType[]
}