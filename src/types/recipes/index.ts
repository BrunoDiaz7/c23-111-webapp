export type recipesResponseData = {
    'message': string,
    'result': [{
        'id': string,
        'name': string,
        'description': string,
        'category': string[],
        'ingredients': string[],
        'totalSteps': number,
        'image': string,
        'rateAverage': number,
        'totalRates': number,
        'createdAt': string
    }]
}

export type recipe = {
    'id': string,
    "_id"?: string,
    'name': string,
    'description': string,
    'category'?: string[],
    'ingredients': string[],
    'totalSteps': number,
    'image': string,
    'rateAverage': number,
    'totalRates': number,
    'createdAt'?: string
    missingIngredient?:  string[]
    status?: string
}

type rates = {
    _id: string,
    rating: number,
    comment: string,
    reviewer?: reviewer,
    recipe: string,
    createdAt: string,
    updatedAt: string
}
type reviewer= {
     _id: string
    name: string
    email: string
    password: string
    rol: string
    favouritesRecipes?: []
    createdAt: string
    __v: number
}
export type recipeWithRates = {
    status: string,
    userId: string,
    totalRates: number,
    _id: string,
    name: string,
    description: string,
    category: string[],
    ingredients: string[],
    steps: string[],
    image: string,
    rateAverage: number,
    createdAt: string,
    rates: rates[]
    
}

export type createRecipe = {
    name: string,
    description: string,
    steps: string[],
    userId: string,
    category: string[],
    ingredients: string[],
    file: string
}


