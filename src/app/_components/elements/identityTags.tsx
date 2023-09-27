
import { Chip, NativeSelect } from "@mantine/core"
import styles from "@/app/styles/elements/identityInput.module.scss"
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
export default function IdentityTags(props: any) {



    const { state, dispatch } = props

    const filteredTags = identitiesData.filter((identity) => {
        if (state.tagGroup === "all") {
            return true
        }
        else {

            return identity.group === state.tagGroup
        }
    })


    // Filter identities data and link to state

    const tagGroups = identitiesData.map((identity) => {
        return identity.group
    })





    return (
        <section className={styles.container}>

            <NativeSelect
                label="Tag Group"
                value={state.tagGroup}
                onChange={(event) => {
                    dispatch({ name: "tagGroup", value: event.target.value })
                }}
                data={[
                    { value: "all", label: "All" },
                    ...tagGroups.map((tagGroup) => {
                        return { value: tagGroup, label: tagGroup }
                    })

                ]}
            />

            <div className={styles.scrollBody}>
                {filteredTags.map((identity) => {
                    return (
                        <div key={identity.key}>


                            <h4>{identity.group}</h4>

                            <Chip.Group
                                // name={identity.group}
                                multiple={true}
                                onChange={(event) => {
                                    let total = 0
                                    for (const key in state) {
                                        if (Array.isArray(state[key])) {
                                            total += state[key].length
                                        }
                                    }
                                    dispatch({ name: identity.key, value: event })
                                    dispatch({ name: "submit", value: "Submit" })
                                }}
                                value={state[identity.group]}
                            >

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

