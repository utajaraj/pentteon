let lastPageLoaded = 0
const generateCatsInfo = (users: any, cats: any): CatInterface[] => {
    const userData = users.results

    const catFactsData = cats.data
    const data: CatInterface[] = []
    for (let i = 0; i < catFactsData.length; i++) {
        const { fact } = catFactsData[i]
        if (userData[i] !== undefined) {

            const { first, last } = userData[i].name
            const picture = userData[i].picture.thumbnail
            data.push({
                fact,
                name: `${first} ${last}`,
                picture
            })
            continue
        }

    }
    return data
}
export interface CatInterface {
    name: string,
    fact: string,
    picture: string
}
export const getCats = async () => {
    try {
        const [usersCall, catsCall] = await Promise.all([
            fetch("https://randomuser.me/api?results=9", { method: "GET" }),
            fetch(`https://catfact.ninja/facts?page=${lastPageLoaded+1}`, { method: "GET" })
        ])

        lastPageLoaded++

        const [userData, catsData] = await Promise.all([
            usersCall.json(),
            catsCall.json()
        ])

        const data: CatInterface[] = generateCatsInfo(userData, catsData)
        return data
    } catch (error) {
        console.log(error);

    }
}

// export const getServerSideProps = (async () => {
//   const data = await getCats()
//   return { props: data }
// })
