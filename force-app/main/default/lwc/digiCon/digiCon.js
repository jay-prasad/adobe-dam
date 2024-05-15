import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import AssetsSelector from "@salesforce/resourceUrl/AssetsSelector"

export default class DigiCon extends LightningElement {
    @track isModalOpen = false;
    @track documentLinks = [];
    @track assetRows = []; // Track the dynamic rows for asset selection

    connectedCallback() {
        loadScript(this, AssetsSelector)
    }

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        this.isModalOpen = false;
    }

    openAssetSelector(event) {
        const rowId = event.target.dataset.id;
        this.selectedRowId = rowId;
        this.loadAssetSelector();
    }

    closeAssetSelector() {
        this.isModalOpen = false;
    }

    
    loadAssetSelector() {
        this.showDialog = true
        const assetSelectorProps = {
            repositoryId: 'delivery-p133222-e1298749.adobeaemcloud.com',
            imsOrg: 'DA5B5B3B52F53B160A490D44@AdobeOrg',
            imsToken: 'token',
            apiKey: 'aemcs-ulsolutions-assetselector',            
            rootPath: '/content/dam/playground',
            selectionType: 'single',
            hideTreeNav: true,
            onClose: this.handleClose,
            handleSelection: this.handleSelection
        }
        /* let container = this.refs.asset-selector-container
        let dialog = this.refs.asset-selector-dialog */
        const container = this.template.querySelector('div.asset-selector-container')
        PureJSSelectors.renderAssetSelector(container, assetSelectorProps, () => {
            this.assetSelectorDialog = this.template.querySelector('dialog.asset-selector-dialog')
            this.assetSelectorDialog.showModal()
        })
    }
    
    
    
    
    
    

    handleSelection(assets) {
        const asset = assets[0];
        this.updateAssetRows(asset);
        this.closeModal();
    }

    updateAssetRows(asset) {
        this.assetRows = this.assetRows.map(row => {
            if (row.id === this.selectedRowId) {
                return { ...row, name: asset.name, url: asset.url };
            }
            return row;
        });
    }

    addNewRow() {
        const newRow = {
            id: Date.now(), // Use current timestamp as unique ID
            name: '',
            url: ''
        };
        this.assetRows = [...this.assetRows, newRow];
    }

    removeDocument(event) {
        const id = parseInt(event.target.dataset.id, 10);
        this.documentLinks = this.documentLinks.filter(link => link.id !== id);
    }

    handleAssetNameChange(event) {
        const rowId = parseInt(event.target.dataset.id, 10);
        const newValue = event.target.value;
        this.assetRows = this.assetRows.map(row => row.id === rowId ? { ...row, name: newValue } : row);
    }
}
