<?php

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;
class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = Permission::all();
        $admin = Role::whereName('Admin')->first();

        foreach($permissions as $permission)
        {
            DB::table('role_permission')->insert([
                'role_id'       => $admin->id,
                'permission_id' => $permission->id,
            ]);
        }

        $editor = Role::whereName('Editor')->first();
        foreach($permissions as $permission)
        {
            if(!in_array($permission->name,['edit_roles'])){
                DB::table('role_permission')->insert([
                    'role_id'           =>  $editor->id,
                    'permission_id'     =>  $permission->id,
                ]);
            }
        }

        $subscriber = Role::whereName('Subscriber')->first();
        $access = ['view_users','view_roles','view_products','view_orders'];
        foreach($permissions as $permission)
        {
            if(in_array($permission->name,$access))
            {
                DB::table('role_permission')->insert(
                [
                    'role_id'           =>  $subscriber->id,
                    'permission_id'     =>  $permission->id,
                ]);
            }
        }
    }
}
