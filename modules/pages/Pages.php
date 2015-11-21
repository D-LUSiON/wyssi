<?php
namespace Controllers;

use Models\Pages as Model;

class Pages extends BaseController {

    function __construct() {
        parent::__construct();
    }
    
    public function index($request){
        if ($request['id']) {
            $this->view($request['id']);
        } else 
        $this->display('Pages/index.tpl');
    }
    
    public function view($id){
        $pages = new Model\Page();
        $page = $pages->getByID($id);
        $this->smarty->assign('page', $page[0]);
        $this->display('Pages/view.tpl');
    }

}