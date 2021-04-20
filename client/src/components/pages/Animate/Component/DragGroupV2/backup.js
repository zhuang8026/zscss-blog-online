return (
    <div
        className="dragV2"
        onDragOver={e => {
            onDragOver(e);
        }}
        onDrop={e => {
            onDrop(e);
        }}
    >
        {isDrag.map((data, index) => {
            return (
                <div
                    key={`drag_${index}`}
                    onDragStart={event => onDragStart(event, index)}
                    onDragOver={event => onDragOverItem(event)}
                    onDrop={event => onDropItem(event, index)}
                    draggable={true}
                    className="draggable"
                >
                    {data.status ? (
                        <div className="demo1-1">
                            <span>{data.perCent}</span>
                            <div className="demo1-2">
                                <p>:::</p>
                                <div className="demo-color"></div>
                                <p>{data.inner}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="demo1-1">
                            <span>{data.perCent}</span>
                            <div className="demo1-2">
                                <p>+</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        })}
    </div>
);

{
    isDrag.map((data, index) => {
        const com = React.createElement(
            'div',
            {
                key: `drag_${index}`,
                onDragStart: event => onDragStart(event, index),
                onDragOver: event => onDragOverItem(event),
                onDrop: event => onDropItem(event, index),
                draggable: true,
                className: 'draggable'
            },
            children
        );

        return (
            <>
                {index}
                {com}
            </>
        );
    });
}
