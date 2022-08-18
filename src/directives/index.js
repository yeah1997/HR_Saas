// directive command

// grooming image element's src
export const imgerror = {
    // when dom obj is inserted
    inserted(dom, options) {
        dom.src = dom.src || options.value

        dom.onerror = ()=> {
            dom.src = options.value 
        }
    },

    // When componented updated
    componentUpdated(dom, options) {
        dom.src = dom.src || options.value
    }
}