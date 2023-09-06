import SplitPane from "react-split-pane";
import { Direction, Scrollbar } from "../../components/Scrollbar";
import { useRef, useState } from "react";
import { Alert } from "antd";
import Measure from 'react-measure';

export default {
    title: 'Components/Scrollbar'
};

export const HorizontalScrollBar = () => {
    const divContentWidth1 = 700;
    const divContentWidth2 = 700;
    const totalWidth = 800;
    const [divWidth1, setDivWidth1] = useState<number>(totalWidth / 2);
    const [divWidth2, setDivWidth2] = useState<number>(0);
    const div1 = useRef<any>();
    const div2 = useRef<any>();
    return (
        <>
            <Alert
                message={
                <>
                    Drag the split panes to rezise the colored divs and the coresponding scrollbars
                </>
                }
            />
            <div style={{position: "relative", height:"2em", width: totalWidth}}>
                {/** @ts-ignore*/}
                <SplitPane
                    split="vertical"
                    defaultSize={totalWidth / 2}
                    onChange={(width)=> { setDivWidth1(width); return true; }}
                >
                    <div ref={div1} style={{overflow:"hidden"}}>
                        <div style={{width: divContentWidth1, backgroundColor: "pink", border: "2px solid red"}}>
                            Some very very very very very very very very very very very very very very very very very very very long text
                        </div>
                    </div>
                    <Measure
                        bounds
                        onResize={contentRect => {
                            setDivWidth2(contentRect.bounds ? contentRect.bounds.width : 0);
                        }}>
                        {({ measureRef }) => {
                            return (  
                                <div ref={(node) => {measureRef(node); div2.current = node;}} style={{overflow:"hidden"}}>
                                    <div style={{width: divContentWidth2, backgroundColor:"yellow", border: "2px solid orange"}}>
                                    Another very very very very very very very very very very very very very very very very very very very long text
                                    </div>
                                </div>
                            );
                        }}
                    </Measure>
                </SplitPane>
            </div>
            <div style={{position: "relative", height:"1em", width: totalWidth}}>
                {/** @ts-ignore*/}
                <SplitPane 
                    split="vertical"
                    defaultSize={totalWidth / 2}>
                        {/* TODO CSR: DISCUTIE: mi se pare f derutant acest demo. Sa nu uitam, ca consumator al unui storybook, tr inteles
                            rapid si clar ceea ce face componentul.

                            1/ vazand Measure, divuri, width: ma intreb: noi NU tinem cont de astea, corect? Deci pot folosi
                            un scroll fara sa fie neaparat cuplat la un div, nu?
                            2/ eu as pune un scroll si atat. Si in demo niste textfielduri pentru pageSize, min, etc. 
                            
                            TEORETIC: Fiind in storybook,
                            el ne pune posibilitatea sa punem cu usurinta astea in partea de jos. Cred ca pana acum nu am prea folosit ac
                            feature.
                            PRACTIC: Ar fi interesant sa ne punem propriile text-box/label. Pentru a le folosi la TAD. Am mai folosit tehnica asta.
                            3/ sa discutam un pic demo-ul curent. Poate ar fi interesant sa extragem un story sa aratam si asta. Desi
                            are totusi destul de putin interes pentru un user sa inlocuiasca logica nativa de scroll cu una artificiala.
                            Probabil ca asta e si motivul pt care nu exista "pe piata" asa ceva
                        */}
                    <Scrollbar pageSize={divWidth1} minScrollPosition={0} maxScrollPosition={divContentWidth1}
                        onScroll={(scrollPosition) => div1.current.scrollLeft = scrollPosition}/>
                    <Scrollbar pageSize={divWidth2} minScrollPosition={0} maxScrollPosition={divContentWidth2}
                        onScroll={(scrollPosition) => div2.current.scrollLeft = scrollPosition} hasArrows={true}/>
                </SplitPane>
            </div>
        </>
    );
}

export const VerticalScrollBar = () => {
    const divContentHeight1 = 500;
    const divContentHeight2 = 500;
    const totalHeight = 500;
    const [divHeight1, setDivHeight1] = useState<number>(totalHeight / 2);
    const [divHeight2, setDivHeight2] = useState<number>(0);
    const div1 = useRef<any>();
    const div2 = useRef<any>();
    return (
        <>
            <Alert
                message={
                <>
                    Drag the split panes to rezise the colored divs and the coresponding scrollbars
                </>
                }
            />
            <div style={{display: "flex", flexDirection: "row", gap: 30}}>
                <div style={{position: "relative", width:"40px", height: totalHeight}}>
                    {/** @ts-ignore*/}
                    <SplitPane
                        split="horizontal"
                        defaultSize={totalHeight / 2}
                        onChange={(height)=> { setDivHeight1(height); return true; }}
                    >
                        <div ref={div1} style={{overflow:"hidden"}}>
                            <div style={{height: divContentHeight1, backgroundColor: "pink", border: "2px solid red"}}>
                                Some very very very very very very very very very very very very very very very very very very very long text
                            </div>
                        </div>
                        <Measure
                            bounds
                            onResize={contentRect => {
                                setDivHeight2(contentRect.bounds ? contentRect.bounds.height : 0);
                            }}>
                            {({ measureRef }) => {
                                return (  
                                    <div ref={(node) => {measureRef(node); div2.current = node;}} style={{overflow:"hidden"}}>
                                        <div style={{height: divContentHeight2, backgroundColor:"yellow", border: "2px solid orange"}}>
                                        Another very very very very very very very very very very very very very very very very very very very long text
                                        </div>
                                    </div>
                                );
                            }}
                        </Measure>
                    </SplitPane>
                </div>
                <div style={{position: "relative", width:"1em", height: totalHeight}}>
                    {/** @ts-ignore*/}
                    <SplitPane 
                        split="horizontal"
                        defaultSize={totalHeight / 2}>
                        <Scrollbar direction={Direction.VERTICAL} pageSize={divHeight1} minScrollPosition={0} maxScrollPosition={divContentHeight1}
                            onScroll={(scrollPosition) => div1.current.scrollTop = scrollPosition}/>
                        <Scrollbar direction={Direction.VERTICAL} pageSize={divHeight2} minScrollPosition={0} maxScrollPosition={divContentHeight2}
                            onScroll={(scrollPosition) => div2.current.scrollTop = scrollPosition} hasArrows={true}/>
                    </SplitPane>
                </div>
            </div>
        </>
    );
}