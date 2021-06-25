import React, {useState, useEffect, useRef} from 'react'

const Dropdown = ({options, selected, onSelectedChange}) => {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null
        }
        return (
            <div onClick={() => {
                onSelectedChange(option)
            }
            } key={option.value} className={`item`}>
                {option.label}
            </div>
        )
    })

    // useEffect(() => {
    //     document.body.addEventListener(
    //         "click",
    //         (e) => {
    //             if(ref.current.contains(e.target)){
    //                 return
    //             }
    //             setOpen(false);
    //         },
    //         {capture: true}
    //     );
    //     return () => {
    //
    //     }
    // }, []);


    useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };
    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);


    return (
        <div ref={ref} className={'ui form'}>
            <div className="field">
                <label htmlFor="" className={`label`}>Select a color</label>
                <div
                    className={`ui selection dropdown ${open ? "visible active" : ""}`}
                    onClick={() => {
                        setOpen(!open)
                    }}
                >
                    <i className="dropdown icon"/>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${open ? "visible transition" : ""}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown