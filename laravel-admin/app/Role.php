<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Role
 *
 * @property int $id
 * @property string $name
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Permission[] $permissions
 * @property-read int|null $permissions_count
 */
class Role extends Model
{
    protected $guarded = ['id'];
    public $timestamps = false;

    // public function role()
    // {
    //     return $this->belongsTo(User::class);
    // }

    public function permissions()
    {
        return $this->belongsToMany(Permission::class,'role_permission');
    }
}
