
fetch(url, data, method, error, callback)
require('isomorphic-fetch');
        require('es6-promise').polyfill();

        var url = rootURL + "/AADs/" + itemInfo.item_id;

        var self = this;
        var requestVariables = itemInfo;
        requestVariables.lifespan = AADInfo.lifespan;
        requestVariables.serial_number = AADInfo.aad_sn;

        fetch(url, {
            method: "PATCH",
            mode: 'CORS',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestVariables)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Editing AAD failed. Bad response " + response.status + " from server");
            }
            return response.json();
        }).then(function (responseData) {
            var AAD = self.all.get(itemInfo.item_id);
            AAD.manufacturer = itemInfo.manufacturer;
            AAD.description = itemInfo.description;
            AAD.is_on_rig = itemInfo.is_on_rig;
            AAD.brand = itemInfo.brand;
            AAD.is_rentable = itemInfo.is_rentable;
            AAD.lifespan = AADInfo.lifespan;
            AAD.serial_number = AADInfo.aad_sn;

            self.all.set(itemInfo.item_id, AAD);
            self.aads.set(itemInfo.item_id, AAD);

            if (self.state.filter === 'all')
            {
                self.setState({
                    rows: Array.from(self.all.values())
                })
            }
            else 
            {
                // must be in AAD display
                self.setState({
                    rows: Array.from(self.aad.values())
                })
            }

        }).catch(function (error) {
            toast.error(error + "\n" + url);
        });