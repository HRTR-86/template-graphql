<?php declare(strict_types=1);

namespace App\Models\Trn;

use App\Models\BaseModel;
use App\Models\Mst\MstRole;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class TrnUser extends BaseModel
{
    use HasFactory;

    protected $table = 'trn_user';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'password',
        'name',
        'image_url',
        'created_by',
        'updated_by',
        'deleted_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * @return HasManyThrough
     */
    public function mstRole(): HasManyThrough
    {
        return $this->hasManyThrough(
            MstRole::class,
            TrnUserRole::class,
            'user_id',
            'id',
            'id',
            'role_id'
        );
    }

    /**
     * @return HasMany
     */
    public function trnUserRole(): HasMany
    {
        return $this->hasMany(TrnUserRole::class, 'user_id', 'id');
    }
}
