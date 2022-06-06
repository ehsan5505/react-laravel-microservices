<?php

use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = \App\Permission::all();
        $admin = \App\Role::whereName('Admin')->first();

        foreach($permissions as $permission)
        {
            DB::insert('role_permission',[
                'permission_id' => $permission->id,
                'role_id'       => $admin->id
            ]);
        }

        $editor = \App\Role::whereName('Editor');
        foreach($permissions as $permission)
        {
            if(!in_array($permission,['edit_roles'])){
                DB:insert('role_permission',[
                    'permission_id'     =>  $permission->id,
                    'role_id'           =>  $editor->id
                ]);
            }
        }

        $subscriber = \App\Role::whereName('Subscriber');
        $access = ['view_users','view_roles','view_products','view_orders'];
        foreach($permissions as $permission)
        {
            if(in_array($permission,$access))
            {
                DB::insert('role_migration',
                [
                    'permission_id'     =>  $permission->id,
                    'role_id'           =>  $subscriber->id
                ]);
            }
        }
    }
}
