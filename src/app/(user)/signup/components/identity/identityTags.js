
import { Chip } from "@mantine/core"
import styles from "./identityInput.module.scss"
import { identitiesData } from "@/app/_utils/data/identitiesData"

// race: [],
//                 gender: [],
//                 sexuality: [],
//                 disability: [],
//                 mentalHealth: [],
//                 neurodivergent: [],
//                 socioeconomic: [],
//                 occupation: [],
//                 political: [],
//                 hobbies: [],
//                 other: [],
export default function IdentityTags(props) {

   

    const { state, dispatch } = props
    
    



    return (
        <section>

            <div className={styles.scrollBody}>
                {identitiesData.map((identity) => {
                    return (
                        <div    key={identity.key}>
                            <h4>{identity.group}</h4>

                            <Chip.Group
                                multiple={true}
                                name={identity.group}
                                onChange={(event) => {
                                    let total = 0
                                    for (const key in state) {
                                        if (Array.isArray(state[key])) {
                                            total += state[key].length
                                        }
                                    }
                                    console.log(state)
                                    dispatch({ name: identity.key, value: event })
                                    dispatch({ name: "submit", value: "Submit" })
                                }}
                                value={state[identity.group]}>
                                    <div className={styles.chipGroup}>
                                {identity.tags.map((tag) => {
                                    return (
                                        <Chip
                                            key={tag}
                                            value={tag}>
                                            {tag}
                                        </Chip>
                                    )
                                })}
                                </div>
                            </Chip.Group>
                        </div>
                    )
                })}

            </div>



        </section>

    )



}

