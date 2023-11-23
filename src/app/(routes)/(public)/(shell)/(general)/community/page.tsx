import TabGroup from "@/app/_components/elements/tabGroup";
import NodeMap from "@/app/_components/nodeMap";
import ResourceNodes from "@/app/_components/resourceNodes";



export default function Community() {

    const pages = new Map(
        [
            ["nodeMap", <NodeMap key="nodeMap" />], 
            // react node map and under it a list that is searchable 
            // through the action bar on top of the node map 
            ["resourceList", <ResourceNodes key="resourceList" />] 
            // Action bar the same as nodemap and all online and in person resources

        ]
    )


    return (
        <div>
            <TabGroup
                tabs={[
                    {
                        key: "nodeMap",
                        label: "Mapped Resources"
                    },
                    {
                        key: "resourceNodes",
                        label: "All Resources"
                    }
                ]}
            >
                {pages}
            </TabGroup>
        </div>
    )
}