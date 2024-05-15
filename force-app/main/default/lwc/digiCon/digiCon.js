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
            imsToken: 'eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MTU3MTU3NzY3MTBfZGVmYzUyMTQtM2YzMy00MTBmLWJkMTQtMWJkMTRlNmMyNWFkX3V3MiIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJjbS1wMTMzMjIyLWUxMjk4NzQ5LWludGVncmF0aW9uLTEiLCJ1c2VyX2lkIjoiNDAyRDFEQTQ2NjJGRTRDRTBBNDk1RkM2QHRlY2hhY2N0LmFkb2JlLmNvbSIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiNDAyRDFEQTQ2NjJGRTRDRTBBNDk1RkM2QHRlY2hhY2N0LmFkb2JlLmNvbSIsImN0cCI6MCwiZmciOiJZT0pSNVFFSUZQUDVNSFVLRk1RVllIQUFUUT09PT09PSIsIm1vaSI6IjlmNmI0NzQzIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwic2NvcGUiOiJyZWFkX3BjLmRtYV9hZW1fYW1zLG9wZW5pZCxBZG9iZUlELHJlYWRfb3JnYW5pemF0aW9ucyxhZGRpdGlvbmFsX2luZm8ucHJvamVjdGVkUHJvZHVjdENvbnRleHQiLCJjcmVhdGVkX2F0IjoiMTcxNTcxNTc3NjcxMCJ9.dOCme9t9HEuYjnYi6wrVVbT3rtc9q1No2XluhuW8c0o75OryRXR1Q6X2CPsiQ0C831HqPhuuM2SoNZvTe6P97AwB2QR6APWPkeulCNhlPWu6Et-7aPTKzyb2BrKx0xZHk18J0YZfPc9vOF7SMEEwggG6pHknFRVkHnMLOA0FowR-J3qGVMsrv2QGVmI1uisKN4pgmrwIMpz7GILOcQ6Qu2QdTl8RV-l1o9SgqWofTQgwTR-txJcvw8-QHIlnwFuHWU5ZWNDOeBvvA-JXJWn8OIK5YI6T7IHjzpdYGvdsFRsMeoJ5zZT6zvUHuduSyCoOB9uASD-XvfH2WLDSDRH9bA',
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
