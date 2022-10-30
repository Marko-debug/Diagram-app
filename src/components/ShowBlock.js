const getBtnOfShapes = document.querySelector(".btn-process")
const getBtnPhysFlow = document.querySelector(".btn-physically-flow")
const getBtnInfoFlow = document.querySelector(".btn-information-flow")
const getBtnInput = document.querySelector(".btn-input")
const getBtnOutput = document.querySelector(".btn-output")
const getBtnEnd = document.querySelector(".btn-end-of-instance")
const getBtnEventTrans = document.querySelector(".btn-event-transition")
const getBtnTwoBranch = document.querySelector(".btn-two-branches")
const getBtnThreeBranch = document.querySelector(".btn-three-branches")
const getBtnSplitBranch = document.querySelector(".btn-split-branches")
const getBtnParallel = document.querySelector(".btn-parallel")
const getBtnRediraction = document.querySelector(".btn-rediraction")
const getBtnEndOfTwoProcess = document.querySelector(".btn-end-of-two-process")
const getBtnEndOfThreeProcess = document.querySelector(".btn-end-of-three-process")

const getText = document.querySelector(".text")

const getButtons = [
    {ref: getBtnOfShapes, shape: "btn-process", short: "pr"}, 
    {ref: getBtnPhysFlow, shape: "btn-physically-flow", short: "pf"}, 
    {ref: getBtnInfoFlow, shape: "btn-information-flow", short: 'if'}, 
    {ref: getBtnInput, shape: "btn-input", short: "in"}, 
    {ref: getBtnOutput, shape: "btn-output", short: "ou"}, 
    {ref: getBtnEnd, shape: "btn-end-of-instance", short: "ei"}, 
    {ref: getBtnEventTrans, shape: "btn-event-transition", short: "et"}, 
    {ref: getBtnTwoBranch, shape: "btn-two-branches", short: "wb"}, 
    {ref: getBtnThreeBranch, shape: "btn-three-branches", short: "hb"},
    {ref: getBtnSplitBranch, shape: "btn-split-branches", short: "sb"},
    {ref: getBtnParallel, shape: "btn-parallel", short: "pa"},
    {ref: getBtnRediraction, shape: "btn-rediraction", short: "re"},
    {ref: getBtnEndOfTwoProcess, shape: "btn-end-of-two-process", short: "ep"},
    {ref: getBtnEndOfThreeProcess, shape: "btn-end-of-three-process", short: "eh"},
    {ref: getText, shape: "text", short: "te"},
]

const ShowUp = (getButton) => {
    const getShowing = document.querySelector(`.${getButton.short}`);
    getShowing.hidden = false;
}

const CloseShow = (getButton) => {
    const getShowing = document.querySelector(`.${getButton.short}`);
    getShowing.hidden = true;
}

getBtnOfShapes.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short === "pr")))
getBtnOfShapes.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "pr")))

getBtnPhysFlow.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "pf")))
getBtnPhysFlow.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "pf")))

getBtnInfoFlow .addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "if")))
getBtnInfoFlow .addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "if")))

getBtnInput.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short === "in")))
getBtnInput.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "in")))

getBtnOutput.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "ou")))
getBtnOutput.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "ou")))

getBtnEnd.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "ei")))
getBtnEnd.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "ei")))

getBtnEventTrans.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short === "et")))
getBtnEventTrans.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "et")))

getBtnTwoBranch.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "wb")))
getBtnTwoBranch.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "wb")))

getBtnThreeBranch.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "hb")))
getBtnThreeBranch.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "hb")))

getBtnSplitBranch.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "sb")))
getBtnSplitBranch.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "sb")))

getBtnParallel.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "pa")))
getBtnParallel.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "pa")))

getBtnRediraction.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "re")))
getBtnRediraction.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "re")))

getBtnEndOfTwoProcess.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "ep")))
getBtnEndOfTwoProcess.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "ep")))

getBtnEndOfThreeProcess.addEventListener("mouseover", () => ShowUp(getButtons.find(getButton => getButton.short  === "eh")))
getBtnEndOfThreeProcess.addEventListener("mouseout", () => CloseShow(getButtons.find(getButton => getButton.short  === "eh")))
export {getButtons}