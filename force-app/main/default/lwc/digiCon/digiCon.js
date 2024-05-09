import { LightningElement, track } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import ASSETS_SELECTORS from '@salesforce/resourceUrl/AssetsSelectors';

export default class DigiCon extends LightningElement {
    @track isModalOpen = false;
    @track documentLinks = [];
    @track assetRows = [];

    connectedCallback() {
        loadScript(this, ASSETS_SELECTORS)
            .then(() => {
                console.log('Assets Selectors script loaded successfully');
                // Additional initialization if necessary
            })
            .catch(error => console.error('Error loading the Assets Selectors script', error));
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
        const container = this.template.querySelector('.asset-selector-container');
        PureJSSelectors.renderAssetSelector(container, {
            repositoryId: "delivery-p133222-e1298749.adobeaemcloud.com",
            imsOrg: 'DA5B5B3B52F53B160A490D44@AdobeOrg',
            imsToken: "your_api_token_here",
            apiKey: "aemcs-ulsolutions-assetselector",
            rootPath: "/content/dam/playground",
            selectionType: "single",
            hideTreeNav: true,
            onClose: () => this.closeAssetSelector(),
            handleSelection: (assets) => this.handleSelection(assets)
        });
    }

    handleSelection(assets) {
        const asset = assets[0];
        this.updateAssetRows(asset);
        this.closeModal();
    }

    updateAssetRows(asset) {
        // Update logic based on asset selection
    }

    addDocument() {
        // Adding a document
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
