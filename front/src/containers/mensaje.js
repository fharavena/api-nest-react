import React from 'react';
import MensajePage from '../pages/mensaje';
import { create, read, remove, update } from "../services/api";

class Mensaje extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            items: [],
            newItemText: '',
        };
        this.onNewItem = this.onNewItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onChageNewItemText = this.onChageNewItemText.bind(this);
        this.onExitEditMode = this.onExitEditMode.bind(this);
        this.onEnterEditMode = this.onEnterEditMode.bind(this);
    }

    async componentDidMount() {
        try {
            const items = await read();
            this.setState({ items });
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    async onNewItem() {
        try {
            const newItem = await create({ mensaje: '' });

            this.setState({
                items: [
                    ...this.state.items,
                    {
                        ...newItem,
                        isEditing: true,
                    }
                ]
            })
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    async onRemoveItem(item) {
        try {
            await remove(item.id);
            const { items } = this.state;
            const index = items.findIndex(n => n.id === item.id);
            if (index === -1) {
                return;
            }
            const newItems = items.slice();
            newItems.splice(index, 1);

            this.setState({
                items: newItems
            });

        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    onChageNewItemText(event) {
        this.setState({ newItemText: event.target.value });
    }

    async onExitEditMode(item) {
        try {
            const {
                items,
                newItemText,
            } = this.state;

            const updatedItem = await update(item.id, { mensaje: newItemText });

            this.setState({
                newItemText: '',
                items:
                    items.map((next) => {
                        if (next.id === item.id) {
                            let neuvo = {
                                ...updatedItem,
                                isEditing: false,
                            }
                            return neuvo;
                        }
                        return next;
                    }),

            });

        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    onEnterEditMode(item) {
        const {
            items,
            newItemText,
        } = this.state;

        this.setState({
            newItemText: item.mensaje,
            items: items.map((next) => {
                if (next.id === item.id) {
                    return {
                        ...next,
                        isEditing: true,
                        mensaje: newItemText,
                    };
                }
                return next;
            }),
        });
    }

    render() {
        const {
            items,
            newItemText,
            error,
        } = this.state;

        return (
            <MensajePage
                items={items}
                onNewItem={this.onNewItem}
                onRemoveItem={this.onRemoveItem}
                onChageNewItemText={this.onChageNewItemText}
                newItemText={newItemText}
                onExitEditMode={this.onExitEditMode}
                onEnterEditMode={this.onEnterEditMode}
                error={error}
            />
        );
    }
}

export default Mensaje;