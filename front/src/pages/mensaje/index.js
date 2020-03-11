import React from "react";
import Layout from "../../components/layout";
import { Card, H2, Divider, UL, Button, Label, InputGroup, Intent, Callout } from "@blueprintjs/core";
import './style.css';

function MensajePage(props) {
    const {
        items,
        onNewItem,
        onRemoveItem,
        newItemText,
        onChageNewItemText,
        onExitEditMode,
        onEnterEditMode,
        error,
    } = props;
    return (
        <Layout>
            <Card>
                <H2>Mensaje</H2>
                <Button
                    text="Nuevo mensaje"
                    intent={Intent.PRIMARY}
                    icon="new-object"
                    className="new-mensaje-item"
                    onClick={onNewItem}
                />
                
                {error && <Callout intent={Intent.DANGER}>{error}</Callout>}

                <Divider />
                <UL className="mensaje-list">
                    {items.map(item =>
                        <li
                            className="mensaje-item"
                            key={item.id}
                        >
                            <Button
                                small
                                icon="remove"
                                intent="danger"
                                className="mensaje-item-action"
                                onClick={() => onRemoveItem(item)}
                            />
                            <Button
                                small
                                icon="edit"
                                intent="warning"
                                className="mensaje-item-action"
                                onClick={() => onEnterEditMode(item)}
                            />

                            {item.isEditing ?
                                <InputGroup
                                    small
                                    className="mensaje-item-text-edit"
                                    placeholder="item text..."
                                    value={newItemText}
                                    onChange={onChageNewItemText}
                                    onBlur={() => onExitEditMode(item)}
                                    inputRef={ref => ref && ref.focus()}
                                    onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            onExitEditMode(item);                                          
                                        }
                                      }}
                                />
                                :
                                <React.Fragment>
                                    <Label
                                        className="mensaje-item-label"
                                        onClick={() => onEnterEditMode(item)}
                                    >
                                        {item.mensaje}
                                    </Label>
                                </React.Fragment>
                            }
                        </li>
                    )}
                </UL>
            </Card>

        </Layout>
    );
}

export default MensajePage;
