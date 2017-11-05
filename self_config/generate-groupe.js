  const path = require('path')
  const slugify = require('slugify')
  const fs = require('fs');
  const util = require("util");
  
  var deleteFolderRecursive = function(path) {
    if( fs.existsSync(path) ) {
      fs.readdirSync(path).forEach(function(file,index){
        var curPath = path + "/" + file
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath)
        } else { // delete file
          fs.unlinkSync(curPath)
        }
      });
      // fs.rmdirSync(path)
      // fs.mkdir(path)
    }
  }

  fs.readdir(path.join(__dirname, '', 'sites'), 'utf8', function (err,sitesVersion) {
    // Vider le répertoire tests
    deleteFolderRecursive(path.resolve('tests'))

    sitesVersion.forEach(function(siteVersion) { 
      // Création des dossiers v2 etv3 dans tests pour les groupes    
      var pathTestGroupe = path.resolve('tests') + '/' + siteVersion + '/'
      // Création du dossier 
      if (!fs.existsSync(pathTestGroupe)) {
        fs.mkdir(pathTestGroupe)
      }

      // charger le model
      var pathConfigSiteGroupe = path.join(__dirname, '', 'sites') + '/'
      var fileModel = pathConfigSiteGroupe + siteVersion + '/model.js'
      // Charger les sites
      var sites = require('./sites/' + siteVersion + '/sites.js')
      
      if (sites.length) {      
        fs.readFile(fileModel, 'utf8',function (err,model) {  
            content = util.format(model);

            sites.forEach(function(site) {  
              
              var fileNameSlug = slugify(site, { remove: /[http:\/\/|https:\/\/]/g})
            	var siteFile = pathTestGroupe + fileNameSlug + '.js'

              var contentReplace = content.replace('#site#', fileNameSlug).replace('#siteUrl#', site)
            	fs.writeFile(siteFile, contentReplace, (error) => { /* handle error */ });
            })
        });
      }

    }) 
  })


