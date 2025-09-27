import data from '../data.json';

//PEGANDO PRODUTOS EM DESTAQUE
export async function GET(){

    await new Promise(resolve => setTimeout(resolve, 1000)) //1s para requisição acontecer

    const featuredProducts = data.products.filter(product =>  product.featured );

    return Response.json( featuredProducts )

}
